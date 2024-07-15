create table User (
    id uuid not null default gen_random_uuid(),
    name text not null,
    email text not null,
    password text not null,
    created_at timestamp not null default now(),
    updated_at timestamp not null default now()
    primary key (id)
    ); 

create table Hokku (
    id uuid not null default gen_random_uuid(),
    userId uuid not null,
    description text,
    ikku text not null,
    niku text not null,
    sanku text not null,
    created_at timestamp not null default now(),
    updated_at timestamp not null default now()
    primary key (id)
    foreign key (userId) references User(id)
    );

create table Tsukeku (
    id uuid not null default gen_random_uuid(),
    hokkuId uuid not null,
    userId uuid not null,
    description text,
    shiku text not null,
    goku text not null,
    created_at timestamp not null default now(),
    updated_at timestamp not null default now()
    primary key (id)
    foreign key (hokkuId) references Hokku(id)
    foreign key (userId) references User(id)
    );

create table Renga (
    id uuid not null default gen_random_uuid(),
    description text,
    hokkuId uuid not null,
    tsukekuId uuid not null,
    created_at timestamp not null default now(),
    updated_at timestamp not null default now()
    primary key (id)
    foreign key (userId) references User(id)
    foreign key (hokkuId) references Hokku(id)
    foreign key (tsukekuId) references Tsukeku(id)
    );
