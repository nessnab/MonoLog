interface MemberSectionProps {
  members: any[];
  user: any;
  workspaceId: number | null;
  refreshMembers: () => void;
}

import MemberForm from "./MemberForm";
import MemberList from "./MemberList";

function MemberSection({ members, user, workspaceId, refreshMembers }: MemberSectionProps) {

  return (
    <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
      <MemberList members={members} />
      {user && user.role === "admin" && (
        <div>
          <h2>Create Member</h2>
            <MemberForm 
              workspaceId={user?.workspaceId} 
              refreshMembers={refreshMembers}
            />
        </div>
      )} 
    </div>
  );
}

export default MemberSection;