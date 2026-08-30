import {Comment} from '../../../../shared/api/models';

type OfferReviewItemProps = {
  comment: Comment;
}

const OfferReviewItem = ({comment}: OfferReviewItemProps) => (
  <li key={comment.id} className="reviews__item">
    <div className="reviews__user user">
      <div className="reviews__avatar-wrapper user__avatar-wrapper">
        <img className="reviews__avatar user__avatar" src={comment.user.avatar} width="54" height="54" alt="Reviews avatar"/>
      </div>
      <span className="reviews__user-name">
        {comment.user.name}
      </span>
    </div>
    <div className="reviews__info">
      <div className="reviews__rating rating">
        <div className="reviews__stars rating__stars">
          <span style={{width: '80%'}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <p className="reviews__text">
        {comment.comment}
      </p>
      <time className="reviews__time" dateTime="2019-04-24">{comment.date.toISOString()}</time>
    </div>
  </li>
);

export default OfferReviewItem;
