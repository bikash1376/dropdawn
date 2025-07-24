import React from "react";
import ReactMarkdown from "react-markdown";
import { marked } from 'marked';

type AnswerProps = {
  answer: string;
  className?: string;
};

export default function Answer({ answer, className }: AnswerProps) {

  const html = marked(answer);
  if (!answer) return null;
  return (
    // <div className={className}>
      /* <ReactMarkdown>{answer}</ReactMarkdown> */
      /* <div>{html}</div> */
    /* </div> */
    <div
    className={className}
    dangerouslySetInnerHTML={{ __html: html }}
  />
    
  );
} 