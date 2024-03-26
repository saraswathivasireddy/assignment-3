import './index.css'

const TabsList = props => {
  const {eachTabList, onClickingTab, isActive} = props
  const {tabId, displayText} = eachTabList

  const isActiveclassName = isActive ? 'active-tab-style' : ''

  const onClickTab = () => onClickingTab(tabId)
  return (
    <li className="tab-name-style" onClick={onClickTab}>
      <button className={`${isActiveclassName} button-element`}>
        {displayText}
      </button>
    </li>
  )
}

export default TabsList
