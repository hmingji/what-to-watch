import classNames from 'classnames';
import { useCallback, useRef } from 'react';
import {
  setPreview,
  setLeft,
  setTop,
  setMovie,
  setDetail,
} from '../../slice/appSlice';
import { useAppDispatch, useAppSelector } from '../../store/configureStore';
import debounce from 'lodash.debounce';
import { MovieListItem } from '../../models/movieList';

interface Props {
  poster_size?: string;
  movieItem: MovieListItem;
}

export default function MovieCard({ movieItem, poster_size = 'w500' }: Props) {
  const isTouch = 'ontouchstart' in window;
  const { isPreviewActivated } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const ref = useRef<HTMLDivElement | null>(null);

  const handleMouseOver = () => {
    if (ref.current && !isPreviewActivated) {
      dispatch(
        setTop(ref.current?.getBoundingClientRect().top + window.scrollY)
      );
      dispatch(
        setLeft(ref.current?.getBoundingClientRect().left + window.scrollX)
      );
      dispatch(setPreview(true));
      dispatch(setMovie(movieItem));
    }
  };

  const debouncedHandleMouseOver = useCallback(
    debounce(handleMouseOver, 500),
    []
  );

  return (
    <div
      ref={ref}
      onMouseOver={() => {
        if (!isTouch) debouncedHandleMouseOver();
      }}
      onMouseLeave={() => {
        if (!isTouch) debouncedHandleMouseOver.cancel();
      }}
      onClick={() => {
        dispatch(setMovie(movieItem));
        dispatch(setDetail(true));
      }}
      className={classNames('w-60 z-[5] h-[360px]')}
    >
      {movieItem.poster_path ? (
        <figure>
          <img
            src={`${process.env.REACT_APP_MOVIEIMAGEAPI_URL}${poster_size}${movieItem.poster_path}`}
            alt={movieItem.poster_path}
          />
        </figure>
      ) : (
        <div className="bg-slate-700 w-full h-full p-2">
          <p className="text-white text-center my-10">{movieItem.title}</p>
        </div>
      )}
    </div>
  );
}
