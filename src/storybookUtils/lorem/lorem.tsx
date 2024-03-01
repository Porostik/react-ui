import React from "react";
import styles from "./lorem.module.scss";
import { generateLorem } from "./generateLorem";

type Props = {
  paragraphs: number;
};

export const Lorem = ({ paragraphs }: Props) => {
  return <span className={styles.lorem}>{generateLorem(paragraphs)}</span>;
};
