import classNames from 'classnames';
import { useCallback, useRef } from 'react';
import { setPreview, setLeft, setTop, setMovie } from '../slice/appSlice';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import debounce from 'lodash.debounce';
import { MovieListItem } from '../models/movieList';

interface Props {
  poster_size?: string;
  movieItem: MovieListItem;
}

export default function MovieCard({ movieItem, poster_size = 'w500' }: Props) {
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
      console.log('debounced completed');
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
        debouncedHandleMouseOver();
      }}
      onMouseLeave={() => {
        debouncedHandleMouseOver.cancel();
      }}
      className={classNames('w-60 z-[5]')}
    >
      <figure>
        <img
          src={`${process.env.REACT_APP_MOVIEIMAGEAPI_URL}${poster_size}/${movieItem.poster_path}`}
          alt={movieItem.title}
        />
      </figure>
    </div>
  );
}
