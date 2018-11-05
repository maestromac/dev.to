export function getOnboardingTags() {
  return fetch('/api/tags/onboarding').then(response => response.json());
}

export function getUsersToFollow() {
  return fetch('/api/users?state=follow_suggestions', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  }).then(response => response.json());
}

export function sendFollowRequest(csrfToken, formData) {
  return fetch('/api/follows', {
    method: 'POST',
    headers: {
      'X-CSRF-Token': csrfToken,
    },
    body: formData,
    credentials: 'same-origin',
  });
}

export function sendOnboardingUpdate(csrfToken, formData) {
  return fetch('/onboarding_update', {
    method: 'PATCH',
    headers: {
      'X-CSRF-Token': csrfToken,
    },
    body: formData,
    credentials: 'same-origin',
  }).then(response => response.json());
}

export function sendFollowUpdate(csrfToken, formData) {
  return fetch('/follows', {
    method: 'POST',
    headers: {
      'X-CSRF-Token': csrfToken,
    },
    body: formData,
    credentials: 'same-origin',
  }).then(response => response.json());
}
