//interface
interface HeaderProps {
  courseName: string;
}

interface ContentProps {
  courseParts: CoursePart[];
}

interface PartProps {
  part: CoursePart;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  description?: string;
}

interface CoursePartBasic extends CoursePartBase {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartBase {
  backgroundMaterial: string;
  kind: "background";
}
interface CoursePartSpecial extends CoursePartBase {
  requirements: string[];
  kind: "special";
}

type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;

//helper function
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

//components
const Header = ({ courseName }: HeaderProps) => <h1>{courseName}</h1>;

const Content = ({ courseParts }: ContentProps) =>
  courseParts.map((part) => <Part key={part.name} part={part} />);

const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <p>{part.description}</p>
        </div>
      );

    case "group":
      return (
        <div>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <p>Project Counts: {part.groupProjectCount} </p>
        </div>
      );

    case "background":
      return (
        <div>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <p>{part.description}</p>
          <p>Background Material: {part.backgroundMaterial}</p>
        </div>
      );

    case "special":
      return (
        <div>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <p>{part.description}</p>
          Requirements:
          {part.requirements.map((r: string, i: number) => (
            <span key={i}> {r}</span>
          ))}
        </div>
      );

    default:
      return assertNever(part);
  }
};

const Total = ({ courseParts }: ContentProps) => {
  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0,
  );

  return <p>Number of exercises {totalExercises}</p>;
};

//everything.
const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special",
    },
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
