import { FaSearch, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { setMuted } from '../slice/appSlice';
import { useAppDispatch, useAppSelector } from '../store/configureStore';

interface Props {
  isSearchOpen: boolean;
  searchTerm: string;
  handleSearchOpen: () => void;
  handleSearchClose: () => void;
  updateSearchOnChange: (event: any) => void;
}

export default function Header({
  isSearchOpen,
  searchTerm,
  handleSearchOpen,
  handleSearchClose,
  updateSearchOnChange,
}: Props) {
  const { isPreviewMuted } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  function handleVolumeOnClick() {
    dispatch(setMuted(!isPreviewMuted));
  }

  return (
    <div className="w-full py-5 flex flex-wrap border-b-2 max-w-6xl mx-auto px-2 justify-between items-center">
      <h1 className="text-primary text-md font-semibold">
        whatToWatch(movies);
      </h1>

      <div className="flex flex-wrap gap-4 items-center">
        {isSearchOpen ? (
          <div className="flex gap-2 items-center">
            <input
              value={searchTerm}
              onChange={updateSearchOnChange}
              type="text"
              placeholder="Type movie name..."
              autoFocus
              className="input input-bordered input-xs w-full max-w-xs text-white"
            />
            <MdClose
              color="white"
              onClick={handleSearchClose}
            />
          </div>
        ) : (
          <div
            className="tooltip tooltip-bottom"
            data-tip="Search Movies"
          >
            <FaSearch
              color="white"
              onClick={handleSearchOpen}
            />
          </div>
        )}

        {isPreviewMuted ? (
          <div
            className="tooltip tooltip-bottom"
            data-tip="Unmute Preview"
          >
            <FaVolumeMute
              color="white"
              onClick={handleVolumeOnClick}
            />
          </div>
        ) : (
          <div
            className="tooltip tooltip-bottom"
            data-tip="Mute Preview"
          >
            <FaVolumeUp
              color="white"
              onClick={handleVolumeOnClick}
            />
          </div>
        )}

        <div>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://themoviedb.org"
          >
            <p className="text-white text-2xs">powered by</p>
            <img
              alt="tmdb"
              src="/logos/tmdb.svg"
              className="w-10"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
