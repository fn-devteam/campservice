
type Props = {
    text: string;
}
const ButtonIcon = ({text} : Props) => {
    return (

        <button className="btn btn-primary">
            <h6>{text}</h6>
        </button>
    );
}

export default ButtonIcon;