// Header component definition
const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

// Part component definition
const Part = ({ part, exercises }) => {
  return (
    <p>
      {part} {exercises}
    </p>
  );
};

// Content component definition
const Content = ({ parts }) => {
  return (
    <div>
      <Part part={parts[0].name} exercises={parts[0].exercises} />
      <Part part={parts[1].name} exercises={parts[1].exercises} />
      <Part part={parts[2].name} exercises={parts[2].exercises} />
    </div>
  );
};

// Total component definition
const Total = ({ parts }) => {
  const total = parts[0].exercises + parts[1].exercises + parts[2].exercises;
  return <p>Number of exercises {total}</p>;
};

// App component definition
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  };

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
