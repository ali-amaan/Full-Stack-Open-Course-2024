// Header component definition
const Header = ({ course }) => {
  return <h1>{course}</h1>;
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
  const course = 'Half Stack application development';
  const parts = [
    { name: 'Fundamentals of React', exercises: 10 },
    { name: 'Using props to pass data', exercises: 7 },
    { name: 'State of a component', exercises: 14 }
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
