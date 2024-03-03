import propTypes from 'prop-types'

export default function ButtonsPages({ elementPerpage, setPages }) {
    console.log(elementPerpage);

    const buttons = [];
    for (let i = 1; i <= elementPerpage; i++) {
        buttons.push(
            <button key={i} onClick={() => setPages(i)}>{i}</button>
        );
    }
    return (
        <div>
            {buttons}
        </div>
    );
}
ButtonsPages.propTypes = {
    elementPerpage: propTypes.string,
    setPages: propTypes.func
  };

