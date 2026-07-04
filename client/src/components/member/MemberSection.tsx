interface MemberSectionProps {
  members: any[];
  user: any;
  // workspaceId: number | null;
  refreshMembers: () => void;
}

import MemberForm from "./MemberForm";
import MemberList from "./MemberList";

function MemberSection({ members, user, refreshMembers }: MemberSectionProps) {

  return (
    <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
      <MemberList members={members} />
      {user && user.role === "admin" && (
        <div>
            <MemberForm 
              workspaceId={user?.workspaceId} 
              refreshMembers={refreshMembers}
              // handleSubmit={handleSubmit}
            />
        </div>
      )} 
    </div>
  );
}

export default MemberSection;