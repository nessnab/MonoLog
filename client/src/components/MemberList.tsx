type Member = {
  id: number;
  name: string;
  email: string;
  role: string;
};

type Props = {
  members: Member[];
};

export default function MemberList({
  members,
}: Props) {
  return (
    <div>
      <h2>Members</h2>

      {members.length === 0 ? (
        <p>No members found.</p>
      ) : (
        <ul>
          {members.map((member) => (
            <li key={member.id}>
              {member.name} ({member.role})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}