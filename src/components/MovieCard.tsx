interface Props {
  movieTitle: string;
}

export default function MovieCard({ movieTitle }: Props) {
  return <div className="badge">{movieTitle}</div>;
}
