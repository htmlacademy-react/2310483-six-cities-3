import { AuthStatus } from '../../../../shared/api/const';
import { usePostComment } from '../../hooks/usePostComment';
import NewReviewForm from './NewReviewForm';
import OfferReviewItem from './OfferReviewItem';
import { useGetComments } from '../../hooks/useGetComments';

type OffersReviewsProps = {
  authStatus: AuthStatus;
  id: string;
}

const OffersReviewsList = ({authStatus, id}: OffersReviewsProps) => {
  const { isPosting, isUpdated, postComment } = usePostComment();
  const comments = useGetComments(id, isUpdated);

  return(
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length + 1}</span></h2>
      <ul className="reviews__list">
        {
          comments.length !== 0
          &&
          comments.map((comment) => (
            <OfferReviewItem
              key={comment.id}
              comment={comment}
            />
          ))
        }
      </ul>
      {
        authStatus === AuthStatus.Auth && <NewReviewForm onCommentPost={postComment} id={id} isPosting={isPosting}/>
      }
    </section>
  );
};

export default OffersReviewsList;
