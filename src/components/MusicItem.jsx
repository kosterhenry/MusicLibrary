import '../App.css';
import { MdEdit, MdDeleteForever } from "react-icons/md";

function MusicItem({ music, onDelete, onEdit}) {

    return (
        <tr>
            <td>{music.title}</td>
            <td>{music.artist}</td>
            <td>{music.album}</td>
            <td>{music.genre}</td>
            <td>
                <a href="/" onClick={e => {e.preventDefault(); onEdit(music)}}>
                <MdEdit />
                </a>&nbsp;
            </td>
            <td>
                <a href="/" onClick={e => {e.preventDefault(); onDelete(music._id)}}>
                <MdDeleteForever />
                </a>
            </td>
        </tr>

    );
}

export default MusicItem;