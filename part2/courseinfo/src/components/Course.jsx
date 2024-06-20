import Header from './Header';

// Content component definition
const Content = ({ parts }) => {
    console.log('Content - Parameters: ', parts);
    return (
        <div>
            {parts.map((part) => (
                <Part key={part.id} part={part.name} exercises={part.exercises} />
            ))}
        </div>
    );
};

// Part component definition
const Part = ({ part, exercises }) => {
    console.log('Part - Parameters: ', part, exercises);
    return (
        <p>
            {part} {exercises}
        </p>
    );
};

const Total = ({ parts }) => {
    console.log('Total - Parameters: ', parts);
    const total = parts.reduce((sum, part) => sum + part.exercises, 0);
    return <p><strong>total of {total} exercises</strong></p>;
};

const Course = ({ course }) => {
    return (
        <>
            <Header text={course.name} level='h2' />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    );
};

export default Course;