import { MovieListItem } from '../../models/movieList';
import { setDetail, setPreview } from '../../slice/appSlice';
import { useAppDispatch, useAppSelector } from '../../store/configureStore';
import ModalContainer from './ModalContainer';
import MovieModalDetailContent from './MovieModalDetailContent';
import MovieModalPreviewContent from './MovieModalPreviewContent';
import ScaleOnToggleAnime from '../Animation/ScaleOnToggleAnime';

interface Props {
  movieItem: MovieListItem;
}

export default function MovieModal({ movieItem }: Props) {
  const { isDetailActivated } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const onScaleDownEndHandler = () => {
    dispatch(setPreview(false));
  };

  if (isDetailActivated)
    return (
      <ModalContainer>
        <div
          id={`detail-${movieItem.id}`}
          className="w-5/6 sm:w-4/6 max-w-[1268px] m-auto mt-10 p-5 bg-[#181818] pb-20 h-full z-50 rounded-md"
        >
          <MovieModalDetailContent movieItem={movieItem} />
        </div>
      </ModalContainer>
    );

  return (
    <ModalContainer>
      <ScaleOnToggleAnime onScaleDownEnd={onScaleDownEndHandler}>
        <div
          id={`preview-${movieItem.id}`}
          className="w-60 z-50 rounded-md h-[360px]"
          onClick={() => dispatch(setDetail(true))}
        >
          <MovieModalPreviewContent movieItem={movieItem} />
        </div>
      </ScaleOnToggleAnime>
    </ModalContainer>
  );
}
