
import PropTypes from "prop-types";

const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`whitespace-nowrap mx-5 py-4 px-1 border-b-2 font-medium text-md ${
      active
        ? "border-bgColor  text-bgColor "
        : "border-transparent text-gray-800 hover:text-gray-700 hover:border-bgColor"
    }`}
  >
    {children}
  </button>
);

TabButton.propTypes = {
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

const Tabs = ({ activeTab, onTabChange, tabs }) => (
  <div className="border-b border-gray-200 mb-6">
    <nav className="-mb-px flex ">
      {tabs.map((tab) => (
        <TabButton
          key={tab.id}
          active={activeTab === tab.id}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </TabButton>
      ))}
    </nav>
  </div>
);

Tabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Tabs;
