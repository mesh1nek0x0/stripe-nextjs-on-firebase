import withAuthMember from "../../../components/helpers/withAuthMember";

const MemberOnly = () => {
  return <h1>products/[product]/member-only</h1>;
};

export default withAuthMember(MemberOnly);
