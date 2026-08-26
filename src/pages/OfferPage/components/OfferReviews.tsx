import { Comment } from '../../../shared/api/models';
import NewCommentForm from './NewCommentForm';

type OffersReviewsProps = {
  comments: Comment[];
}

const OffersReviews = ({comments}: OffersReviewsProps) => (
  <section className="offer__reviews reviews">
    <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">1</span></h2>
    <ul className="reviews__list">
      {comments.map((comment) => (
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
      ))}
    </ul>
    <NewCommentForm/>
  </section>
);

export default OffersReviews;
