import { Comment } from '../../../../shared/api/models';
import NewReviewForm from '../NewReviewForm';
import OfferReviewItem from './OfferReviewItem';

type OffersReviewsProps = {
  comments: Comment[];
}

const OffersReviewsList = ({comments}: OffersReviewsProps) => (
  <section className="offer__reviews reviews">
    <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">1</span></h2>
    <ul className="reviews__list">
      {comments.map((comment) => (
        <OfferReviewItem
          key={comment.id}
          comment={comment}
        />
      ))}
    </ul>
    <NewReviewForm/>
  </section>
);

export default OffersReviewsList;
