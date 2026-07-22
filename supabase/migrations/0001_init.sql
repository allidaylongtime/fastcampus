-- 피그마피디아 커뮤니티 초기 스키마
-- profiles / categories / posts / post_categories / likes / bookmarks

create type public.chip_type as enum ('category', 'notice');

-- ---------------------------------------------------------------------------
-- profiles (auth.users 확장)
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  nickname text not null,
  avatar_url text,
  created_at timestamptz not null default now()
);

-- auth.users에 신규 유저가 생기면 profiles 행을 자동 생성
-- (닉네임/아바타는 이메일 가입엔 없고 구글 OAuth엔 nickname 대신 full_name/name/
--  avatar_url/picture 키로 오므로 순서대로 폴백)
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, nickname, avatar_url)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'nickname',
      new.raw_user_meta_data ->> 'full_name',
      new.raw_user_meta_data ->> 'name',
      split_part(new.email, '@', 1)
    ),
    coalesce(
      new.raw_user_meta_data ->> 'avatar_url',
      new.raw_user_meta_data ->> 'picture'
    )
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- categories
-- ---------------------------------------------------------------------------
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  label text not null unique,
  type public.chip_type not null default 'category',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- posts
-- ---------------------------------------------------------------------------
create table public.posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  content text not null,
  preview text not null,
  thumbnail_type smallint not null default 1 check (thumbnail_type between 1 and 6),
  view_count int not null default 0,
  like_count int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index posts_created_at_idx on public.posts (created_at desc);
create index posts_like_count_idx on public.posts (like_count desc);
create index posts_author_id_idx on public.posts (author_id);

create function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger posts_set_updated_at
  before update on public.posts
  for each row execute function public.set_updated_at();

-- Write 폼이 title/content만 보내므로, preview가 비어있으면 content 앞부분으로 자동 채움
-- (not null 제약은 유지, insert 전에 트리거가 먼저 채워 넣음)
create function public.posts_set_default_preview()
returns trigger
language plpgsql
as $$
begin
  if new.preview is null or btrim(new.preview) = '' then
    new.preview := left(regexp_replace(new.content, '\s+', ' ', 'g'), 120);
  end if;
  return new;
end;
$$;

create trigger posts_default_preview
  before insert on public.posts
  for each row execute function public.posts_set_default_preview();

-- 조회수 증가용 RPC (프론트에서 supabase.rpc('increment_view_count', { post_id }) 호출)
create function public.increment_view_count(post_id uuid)
returns void
language sql
security definer set search_path = public
as $$
  update public.posts set view_count = view_count + 1 where id = post_id;
$$;

-- ---------------------------------------------------------------------------
-- post_categories (게시글-카테고리 다대다, 칩 복수 허용)
-- ---------------------------------------------------------------------------
create table public.post_categories (
  post_id uuid not null references public.posts (id) on delete cascade,
  category_id uuid not null references public.categories (id) on delete cascade,
  primary key (post_id, category_id)
);

create index post_categories_category_id_idx on public.post_categories (category_id);

-- ---------------------------------------------------------------------------
-- likes
-- ---------------------------------------------------------------------------
create table public.likes (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (post_id, user_id)
);

create function public.sync_post_like_count()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  if (tg_op = 'INSERT') then
    update public.posts set like_count = like_count + 1 where id = new.post_id;
    return new;
  elsif (tg_op = 'DELETE') then
    update public.posts set like_count = like_count - 1 where id = old.post_id;
    return old;
  end if;
  return null;
end;
$$;

create trigger likes_sync_post_like_count
  after insert or delete on public.likes
  for each row execute function public.sync_post_like_count();

-- ---------------------------------------------------------------------------
-- bookmarks
-- ---------------------------------------------------------------------------
create table public.bookmarks (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (post_id, user_id)
);

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.posts enable row level security;
alter table public.post_categories enable row level security;
alter table public.likes enable row level security;
alter table public.bookmarks enable row level security;

-- profiles: 누구나 조회, 본인만 수정
create policy "profiles_select_all" on public.profiles
  for select using (true);
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- categories: 누구나 조회 (쓰기는 서비스 롤/대시보드에서만)
create policy "categories_select_all" on public.categories
  for select using (true);

-- posts: 누구나 조회, 본인 글만 작성/수정/삭제
create policy "posts_select_all" on public.posts
  for select using (true);
create policy "posts_insert_own" on public.posts
  for insert with check (auth.uid() = author_id);
create policy "posts_update_own" on public.posts
  for update using (auth.uid() = author_id);
create policy "posts_delete_own" on public.posts
  for delete using (auth.uid() = author_id);

-- post_categories: 누구나 조회, 게시글 작성자만 연결 관리
create policy "post_categories_select_all" on public.post_categories
  for select using (true);
create policy "post_categories_manage_own_post" on public.post_categories
  for all using (
    exists (
      select 1 from public.posts
      where posts.id = post_categories.post_id
        and posts.author_id = auth.uid()
    )
  );

-- likes: 본인 좋아요만 조회/등록/삭제
create policy "likes_select_own" on public.likes
  for select using (auth.uid() = user_id);
create policy "likes_insert_own" on public.likes
  for insert with check (auth.uid() = user_id);
create policy "likes_delete_own" on public.likes
  for delete using (auth.uid() = user_id);

-- bookmarks: 본인 북마크만 조회/등록/삭제
create policy "bookmarks_select_own" on public.bookmarks
  for select using (auth.uid() = user_id);
create policy "bookmarks_insert_own" on public.bookmarks
  for insert with check (auth.uid() = user_id);
create policy "bookmarks_delete_own" on public.bookmarks
  for delete using (auth.uid() = user_id);
