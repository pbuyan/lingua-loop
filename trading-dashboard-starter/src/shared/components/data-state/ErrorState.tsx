interface ErrorStateProps {
  message?: string;
}

export function ErrorState({ message = 'Something went wrong.' }: ErrorStateProps) {
  return <div className="panel">Error: {message}</div>;
}
