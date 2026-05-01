import { RiEmotionSadLine } from 'react-icons/ri';

interface ErrorMessage1Props {
  message: string;
}

export const ErrorMessage1 = ({ message }: ErrorMessage1Props) => {
  return (
    <div className="flex w-full min-w-0 items-start gap-2 text-left text-xl md:text2xl text-red-500 wrap-break-word whitespace-normal border border-red-300/70 bg-red-50/70 px-4 py-3 rounded-lg">
      <RiEmotionSadLine className="mt-0.5 h-6 shrink-0" />
      <span className="min-w-0 leading-snug">{message}</span>
    </div>
  );
};
