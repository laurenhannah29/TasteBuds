export function Profile(props) {
    return (<div>
        Photo: <input value={props.photo} onChange={props.onPhoto}/>
        Name: <input value={props.profile_name} onChange={props.onName}/>
        Bio: <input value={props.bio} onChange={props.onBio}/>
        {/* <button onClick={props.onDelete}>Delete</button> */}
    </div>);
}

