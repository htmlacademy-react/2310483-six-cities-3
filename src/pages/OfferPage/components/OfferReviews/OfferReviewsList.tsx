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
  const sortedComments = comments.sort((c1, c2) => new Date(c2.date).getTime() - new Date(c1.date).getTime()).slice(0, 10);
  return(
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
      <ul className="reviews__list">
        {
          sortedComments.length !== 0
          &&
          sortedComments.map((comment) => (
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
