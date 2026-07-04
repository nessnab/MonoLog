interface MemberSectionProps {
  members: any[];
  user: any;
  workspaceId: number | null;
  onMemberCreated: () => void;
}


// import type { AnyCaaRecord } from "node:dns";
import MemberForm from "./MemberForm";
import MemberList from "./MemberList";

function MemberSection({ members, user, workspaceId, onMemberCreated }: MemberSectionProps) {

  const refreshMembers = async () => {
    
  }

console.log(user, workspaceId)
  return (
    <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
      <MemberList members={members} />
      {user && user.role === "admin" && (
        <div>
          <h2>Create Member</h2>
            <MemberForm 
              workspaceId={user?.workspaceId} 
              onMemberCreated={refreshMembers}
            />
        </div>
      )} 
    </div>
  );
}

export default MemberSection;