const Header = ({ text, level }) => {
    const Tag = level || 'h1';
    return <Tag>{text}</Tag>;
};

export default Header;
