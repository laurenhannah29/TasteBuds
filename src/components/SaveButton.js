export function SaveButton(props) {
    return (<div>
        <button post_id={props.post_id} onClick={props.onClick}>Save</button>
    </div>);
}