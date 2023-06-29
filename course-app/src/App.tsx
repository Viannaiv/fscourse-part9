interface HeaderProps {
  name: string;
}

interface ContentProps {
  content: CourseItem[];
}

interface TotalProps {
  content: CourseItem[];
}

interface CourseItem {
  name: string;
  exerciseCount: number;
}

const Header = (props: HeaderProps) => <h1>{props.name}</h1>

const Content = (props: ContentProps) => (
  <>
    {props.content.map(item => <p key={item.name}>{item.name} {item.exerciseCount}</p>
    )}
  </>
)

const Total = (props: TotalProps) => (
  <p>
    {`Number of exercises 
        ${props.content.reduce((acc, item) => acc + item.exerciseCount, 0)}`}
  </p>
)

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content content={courseParts} />
      <Total content={courseParts}/>
    </div>
  );
};

export default App;
