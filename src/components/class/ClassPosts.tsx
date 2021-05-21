import { ReactElement, useState } from "react";
import dayjs from "dayjs";
import Button from "../Button";
import { ClassHolder } from "../../types/props";
import { post } from "../../utils/fetch";

export default function ClassPosts(props: ClassHolder): ReactElement {
	const [posts, setPosts] = useState(props.class.posts);
	const [postContent, setPostContent] = useState("");
	const [posting, setPosting] = useState(false);

	return (
		<>
			<div className="flex mb-5">
				<textarea
					onChange={e => setPostContent(e.target.value)}
					value={postContent}
					placeholder="Chat with your class!"
				/>
				<Button
					onClick={async () => {
						if (postContent.trim() !== "" && !posting) {
							setPosting(true);
							const response = await post(
								"/api/class/posts/create",
								{
									class_id: props.class.id,
									content: postContent
								}
							);
							setPostContent("");
							setPosting(false);
							if (response.status === 200)
								setPosts([...posts, await response.json()]);
						}
					}}>
					Post
				</Button>
			</div>

			{[...posts].reverse().map(post => {
				const createdAt = dayjs(post.createdAt);
				return (
					<div className="my-2" key={post.id}>
						<img
							src={post.user.image}
							className="profile-picture float-left mr-3"
						/>
						<div>
							<p className="font-semibold inline mr-1">
								{post.user.name}
							</p>
							<span className="post-short-timestamp inline text-xs text-gray-600 relative">
								{createdAt
									.startOf("day")
									.isSame(dayjs().startOf("day"))
									? `Today at ${createdAt.format("h:mm A")}`
									: createdAt
											.startOf("day")
											.isSame(
												dayjs()
													.startOf("day")
													.subtract(1, "day")
											)
									? `Yesterday at ${createdAt.format(
											"h:mm A"
									  )}`
									: createdAt.format("MM/DD/YYYY")}
								<span className="post-long-timestamp absolute -top-12 w-40 left-1/2 -ml-20 bg-black text-white text-sm text-center px-2 py-1 rounded-xl">
									{createdAt.format(
										"dddd, MM/DD/YYYY h:mm A"
									)}
								</span>
							</span>
							<p className="break-words">{post.content}</p>
						</div>
					</div>
				);
			})}
		</>
	);
}
