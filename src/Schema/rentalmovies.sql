create database rentalmovies;
use rentalmovies;

create table movies (
		id int not null auto_increment,
        title varchar(50),
        description varchar(8000),
        image varchar(100),
        constraint pk_movies primary key(id)
) ;

create table users (
        id int not null auto_increment,
        username varchar(50),
        email varchar(50),
        rol tinyint,
        password varchar(80),
        constraint pk_users primary key(id)
) ;

create table favorites (
		id int not null auto_increment,
		id_movie int,
        id_user int,
        constraint pk_favorites primary key(id, id_movie,id_user),
        constraint fk_favorites_movie foreign key(id_movie) references movies(id) on delete cascade,
		constraint fk_favorites_user foreign key(id_user) references users(id) on delete cascade
	    
);
