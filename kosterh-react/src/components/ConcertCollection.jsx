import ConcertItem from './ConcertItem';

function ConcertCollection({ concerts, onDelete, onEdit}) {
    return (
        <table>
          <thead>
            <tr>
              <th>Artist</th>
              <th>Concert</th>
              <th>Date</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {concerts.map((concert, i) => <ConcertItem concert={concert} 
                    onDelete={onDelete} onEdit={onEdit} key={i} />)}
          </tbody>
        </table>
      );
}

export default ConcertCollection;