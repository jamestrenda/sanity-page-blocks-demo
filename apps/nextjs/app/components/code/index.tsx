// import '@fontsource/jetbrains-mono';
import { cn } from '@repo/utils';
import { Refractor, registerLanguage } from 'react-refractor';
import ts from 'refractor/typescript';
import './styles.css';

registerLanguage(ts);

export const CodeBlock = (props: {
  language: string;
  code: string;
  highlightedLines?: string[];
}) => {
  return (
    <div className="overflow-hidden">
      <div className="pointer-events-auto w-full max-w-full">
        <Refractor
          className={cn('rounded-md *:font-mono!')}
          language={props.language}
          value={props.code}
          markers={
            Array.isArray(props.highlightedLines)
              ? props.highlightedLines.map((line) => parseInt(line))
              : undefined
          }
        />
      </div>
    </div>
  );
};
