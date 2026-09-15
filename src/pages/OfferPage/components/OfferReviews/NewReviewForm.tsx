import { useState } from 'react';
import React from 'react';
import { CommentData } from '../../../../shared/api/type';

const RATING: string[] = ['5', '4', '3', '2', '1'];

type NewReviewFormProps = {
  onCommentPost: (commentData: CommentData, id: string) => Promise<void>;
  isPosting: boolean;
  id: string | null;
}

const NewReviewForm = ({onCommentPost, isPosting, id}: NewReviewFormProps) => {
  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState<string | null>(null);

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (id && comment !== null && rating !== null) {
      onCommentPost(
        {
          comment: comment,
          rating: Number(rating)
        },
        id
      );
      setComment('');
      setRating(null);
    }
  };

  const isButtonDisabled = () => {
    if (isPosting || comment.length < 50 || comment.length > 300 || rating === null) {
      return true;
    }
    return false;
  };

  return (
    <form onSubmit={handleSubmit} className="reviews__form form" action="#">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {
          RATING.map((value: string) => (
            <React.Fragment key={value}>
              <input
                onChange={() => setRating(value)}
                className="form__rating-input visually-hidden"
                name="rating"
                value={value}
                id={`${value}-stars`}
                type="radio"
                checked={rating === value}
                disabled={isPosting}
              />
              <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </React.Fragment>
          ))
        }
      </div>
      <textarea disabled={isPosting} onChange={(evt) => setComment(evt.target.value)} value={comment} className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved">
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isButtonDisabled()}>Submit</button>
      </div>
    </form>
  );
};

export default NewReviewForm;
