import classNames from 'classnames';
import { useState } from 'react';
import ReactPlayer from 'react-player';
import { useTimer } from 'react-timer-hook';
import { useMovieDetailQuery } from '../hooks/useMovieDetailQuery';
import { useMovieVideoQuery } from '../hooks/useMovieVideoQuery';
import { Video } from '../models/movieVideos';
import MovieDetailModal from './MovieDetailModal';

interface Props {
  title: string;
  poster_path: string | undefined;
  poster_size?: string;
  id: number;
}

export default function MovieCard({
  title,
  poster_path,
  id,
  poster_size = 'w500',
}: Props) {
  const [isHover, setIsHover] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [show, setShow] = useState(false);
  const time = new Date();
  time.setSeconds(time.getSeconds() + 2);
  const { restart } = useTimer({
    expiryTimestamp: time,
    onExpire: () => {
      if (isHover) {
        setPlaying(true);
        setShow(true);
      }
    },
    autoStart: false,
  });

  const { data: movieDetail } = useMovieDetailQuery(id, isHover);
  const { data: movieVideo } = useMovieVideoQuery(id, isHover);

  const movieVideoYT: Video | undefined = movieVideo?.results.find(
    (video) => video.site === 'YouTube'
  );

  return (
    <div
      onMouseEnter={() => {
        setIsHover(true);
        const time = new Date();
        time.setSeconds(time.getSeconds() + 4);
        restart(time);
      }}
      onMouseLeave={() => {
        setIsHover(false);
        setPlaying(false);
        setShow(false);
      }}
      className={classNames(
        'w-60 transition-all duration-500 ease-in-out relative hover:z-50',
        isHover ? 'scale-125' : 'scale-100'
      )}
    >
      <figure>
        <img
          src={`${process.env.REACT_APP_MOVIEIMAGEAPI_URL}${poster_size}/${poster_path}`}
          alt={title}
        />
      </figure>

      <div
        className={classNames(
          'absolute inset-0 bg-black transition-all duration-500 ease-in-out origin-left',
          isHover ? 'scale-x-100 delay-500' : 'scale-x-0'
        )}
      >
        {movieVideoYT && (
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${movieVideoYT.key}`}
            width="100%"
            height="240px"
            onReady={() => setPlaying(true)}
            onStart={() => setPlaying(false)}
            //todo: to have a mute toggle button
            muted={!show}
            playing={playing}
            style={{ visibility: show ? 'visible' : 'hidden' }}
          />
        )}
        <div className="p-2">
          <h1>{title}</h1>
          <p className="text-xs">{movieDetail?.tagline}</p>
          {movieDetail?.genres.map((genre) => (
            <div
              key={genre.id}
              className="badge badge-sm badge-primary ml-1 mb-1"
            >
              {genre.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
