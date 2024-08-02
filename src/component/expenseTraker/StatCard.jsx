import PropTypes from "prop-types";
import Card from "../../modules/Card/Card";
import CardBody from "../../modules/Card/CardBody";

const StatCard = ({ title, value, icon: Icon, iconColor }) => (
  <Card className='flex-1 min-w-[150px] bg-inherit text-inherit border rounded-lg shadow-md'>
    <CardBody className='p-4 flex items-center justify-between'>
      <div className='flex flex-col text-left'>
        <span className='text-lg font-medium'>{title}</span>
        <span className='text-xl font-bold'>{value}₹</span>
      </div>
      <Icon className={`text-2xl ${iconColor}`} />
    </CardBody>
  </Card>
);

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  icon: PropTypes.elementType.isRequired, // 'elementType' is used for components
  iconColor: PropTypes.string,
};

export default StatCard;
