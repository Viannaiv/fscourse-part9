interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartRequirements extends CoursePartDescription {
  requirements: string[];
  kind: "special"
}

type CoursePart = 
  CoursePartBasic 
  | CoursePartGroup 
  | CoursePartBackground 
  | CoursePartRequirements;

const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group"
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
    kind: "background"
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
    kind: "special"
  }
];

interface HeaderProps {
  name: string;
}

interface CoursePartListProps {
  courseParts: CoursePart[];
}

interface CoursePartProps {
  coursePart: CoursePart;
}

/**
 * Helper function for exhaustive type checking
*/
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = (props: CoursePartProps) => {
  const coursePart = props.coursePart;
  const baseInfo = <b>{coursePart.name} {coursePart.exerciseCount}</b>;

  switch (coursePart.kind) {
    case 'basic':
      return <p>{baseInfo} <br/> <i>{coursePart.description}</i></p>;
    case 'group':
      return (
          <p>
            {baseInfo} <br/> 
            Project exercises: {coursePart.groupProjectCount}
          </p>
        );
    case 'background':
      return (
        <p>
          {baseInfo} <br/> 
          <i>{coursePart.description}</i> <br/> 
          Background material: {coursePart.backgroundMaterial}
        </p>
      );
      case 'special':
      return (
        <p>
          {baseInfo} <br/> 
          <i>{coursePart.description}</i> <br/> 
          Required skills: {coursePart.requirements.join(", ")}
        </p>
      );
    default:
      return assertNever(coursePart);
  }
}

const Header = (props: HeaderProps) => <h1>{props.name}</h1>

const Content = (props: CoursePartListProps) => (
  <>
    {props.courseParts.map(coursePart => 
      <Part key={coursePart.name} coursePart={coursePart}/>
    )}
  </>
)

const Total = (props: CoursePartListProps) => (
  <p>
    {`Number of exercises 
      ${props.courseParts.reduce((acc, item) => acc + item.exerciseCount, 0)}`}
  </p>
)

const App = () => {
  const courseName = "Half Stack application development";

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts}/>
    </div>
  );
};

export default App;
