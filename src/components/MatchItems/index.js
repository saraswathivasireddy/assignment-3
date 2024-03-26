import './index.css'

const MatchItems = props => {
  const {eachImage, onClickingMatchItem} = props
  const {thumbnailUrl, id} = eachImage
  const onClickMatchItem = () => onClickingMatchItem(id)
  return (
    <li className="each-list-image" onClick={onClickMatchItem}>
      <button className="image-button-element">
        <img src={thumbnailUrl} alt="thumbnail" className="thumbnail-image" />
      </button>
    </li>
  )
}

export default MatchItems
