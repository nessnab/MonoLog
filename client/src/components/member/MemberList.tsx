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

      {members.length === 0 ? (
        <p>No members found.</p>
      ) : (
        <div className="h-45 overflow-y-auto items-center rounded-xl border border-border bg-surface shadow-sm p-4">
          <h2>Members</h2>
          {members.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-2 hover:bg-muted">
              <span className="capitalize">{member.name}</span>
              <span 
              className={`
                w-1/5 bg-primary-light rounded-sm text-xs text-muted-foreground capitalize text-center py-1
                ${
                  member.role === "admin"
                      ? "bg-primary-light "
                      : "bg-success-light "
                }
              `}>

                  {member.role}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}