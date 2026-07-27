import type { Diary } from "../type";

export const AllDiaries = ({ diaries }: { diaries: Diary[] }) => (
  <div>
    {diaries.map((d: Diary) => (
      <ul key={d.id}>
        <li>Date: {d.date}</li>
        <li>weather: {d.weather}</li>
        <li>visibility: {d.visibility}</li>
        <li>comment: {d.comment}</li>
      </ul>
    ))}
  </div>
);
