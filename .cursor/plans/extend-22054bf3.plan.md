<!-- 22054bf3-1c61-4795-8630-0a15b82b9cf1 00f799d1-91c6-4557-82ab-3ac90b752bc0 -->
# Return Group Members With Shared Feeds

## Overview

- Extend the feed response so `sharedFeedWithGroups` entries include group members, enabling clients to display members for feeds shared with groups.

## Steps

1. Update DTOs

- Add an optional `members` field to `[src/libs/dto/group/group.response.dto.ts](src/libs/dto/group/group.response.dto.ts)` annotated for GraphQL and typed as `FriendResponseDto[]` to expose group members without breaking existing contracts.

2. Fetch Group Members in Feed Service

- In `[src/components/feed/feed.service.ts](src/components/feed/feed.service.ts)`, enhance `getFeedSharedWithGroups` to join each group’s `friendGroups` and collect corresponding friend profiles in bulk.
- Map each friend entry to `FriendResponseDto` (reuse existing helper patterns) and include them when building the group response objects.

3. Wire into Feed Mapping

- Ensure `mapToFeedResponseDto` passes through the enriched group objects so `getAllVisibleFeeds` (and related resolvers) return group data complete with member lists.

4. Validation

- Review for potential null/empty states, confirm counts remain accurate, and spot-check with representative feed data (manual/local query) once implementation is complete.