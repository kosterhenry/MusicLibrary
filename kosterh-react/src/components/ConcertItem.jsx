import '../App.css';
import { MdEdit, MdDeleteForever } from "react-icons/md";

function ConcertItem({ concert, onDelete, onEdit}) {

    return (
        <tr>
            <td>{concert.artist}</td>
            <td>{concert.concert}</td>
            <td>{concert.date}</td>
            <td>
                <a href="/" onClick={e => {e.preventDefault(); onEdit(concert)}}>
                <MdEdit />
                </a>&nbsp;
            </td>
            <td>
                <a href="/" onClick={e => {e.preventDefault(); onDelete(concert._id)}}>
                <MdDeleteForever />
                </a>
            </td>
        </tr>

    );
}

export default ConcertItem;