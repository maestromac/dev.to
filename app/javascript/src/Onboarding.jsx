import { h, Component } from 'preact';
import OnboardingWelcome from './components/OnboardingWelcome';
import OnboardingFollowTags from './components/OnboardingFollowTags';
import OnboardingFollowUsers from './components/OnboardingFollowUsers';
import OnboardingWelcomeThread from './components/OnboardingWelcomeThread';
import cancelSvg from '../../assets/images/cancel.svg';
import OnboardingProfile from './components/OnboardingProfile';
import * as apiUtil from './utils/apiUtils';
import * as helper from './utils/onboardingHelper';
import 'preact/devtools';

const getContentOfToken = token =>
  document.querySelector(`meta[name='${token}']`).content;
const getFormDataAndAppend = array => {
  const form = new FormData();
  array.forEach(item => form.append(item.key, item.value));
  return form;
};

export default class Onboarding extends Component {
  state = {
    pageNumber: 1,
    showOnboarding: false,
    userData: null,
    allTags: [],
    users: [],
    checkedUsers: [],
    followRequestSent: false,
    articles: [],
    savedArticles: [],
    saveRequestSent: false,
    profileInfo: {},
  };

  componentDidMount() {
    window.onboardingCsrfToken = getContentOfToken('csrf-token');
    this.updateUserData();
    this.getUserTags();
    document.getElementsByTagName('body')[0].classList.add('modal-open');
  }

  getUserTags = async () => {
    const tagArray = await apiUtil.getOnboardingTags();
    const tags = tagArray.reduce(
      (acc, tag) => ({ ...acc, [tag.name]: { ...tag, following: false } }),
      {},
    );
    const { userData } = this.state;
    userData.followed_tag_names.forEach(followingTag => {
      if (Object.prototype.hasOwnProperty.call(tags, followingTag)) {
        tags[followingTag].following = true;
      }
    });
    this.setState({ allTags: tags });
  };

  getUsersToFollow = async () => {
    const { users } = this.state;
    if (users.length > 0) return;
    const json = await apiUtil.getUsersToFollow();
    this.setState({ users: json, checkedUsers: json });
  };

  handleBulkFollowUsers = async users => {
    const { checkedUsers, followRequestSent } = this.state;

    if (checkedUsers.length > 0 && !followRequestSent) {
      const formData = getFormDataAndAppend([
        { key: 'users', value: JSON.stringify(users) },
      ]);

      const response = await apiUtil.sendBulkFollowRequest(formData);
      this.setState({ followRequestSent: response.ok });
    }
  };

  handleUserProfileSave = async () => {
    const { profileInfo } = this.state;
    const formData = getFormDataAndAppend([
      { key: 'user', value: JSON.stringify(profileInfo) },
    ]);

    const response = await apiUtil.sendOnboardingUpdate(formData);
    this.setState({ saveRequestSent: response.ok });
  };

  updateUserData = () => {
    const receivedData = JSON.parse(document.body.getAttribute('data-user'));
    this.setState({
      userData: receivedData,
      showOnboarding: receivedData.saw_onboarding,
    });
  };

  handleFollowTag = async tag => {
    const formData = getFormDataAndAppend([
      { key: 'followable_type', value: 'Tag' },
      { key: 'followable_id', value: tag.id },
      { key: 'verb', value: tag.following ? 'unfollow' : 'follow' },
    ]);

    const { allTags } = this.state;
    const followedTag = Object.assign({}, allTags[tag.name]);
    followedTag.following = true;
    this.setState({
      allTags: { ...allTags, [followedTag.name]: followedTag },
    });

    const json = await apiUtil.sendFollowUpdate(formData);
    const outcome = json.outcome === 'followed';
  };

  handleCheckAllUsers = () => {
    if (this.state.checkedUsers.length < this.state.users.length) {
      this.setState({ checkedUsers: this.state.users.slice() });
    } else {
      this.setState({ checkedUsers: [] });
    }
  };

  handleProfileChange = event => {
    const newProfileInfo = this.state.profileInfo;
    newProfileInfo[event.target.name] = event.target.value;
    this.setState({ profileInfo: newProfileInfo });
  };

  handleCheckUser = user => {
    const newCheckedUsers = this.state.checkedUsers.slice();
    if (this.state.checkedUsers.indexOf(user) > -1) {
      const index = newCheckedUsers.indexOf(user);
      newCheckedUsers.splice(index, 1);
    } else {
      newCheckedUsers.push(user);
    }
    this.setState({ checkedUsers: newCheckedUsers });
  };

  handleSaveAllArticles = () => {
    if (this.state.savedArticles.length < this.state.articles.length) {
      this.setState({ savedArticles: this.state.articles.slice() });
    } else {
      this.setState({ savedArticles: [] });
    }
  };

  handleSaveArticle = article => {
    const newSavedArticles = this.state.savedArticles.slice();
    if (this.state.savedArticles.indexOf(article) > -1) {
      const index = newSavedArticles.indexOf(article);
      newSavedArticles.splice(index, 1);
    } else {
      newSavedArticles.push(article);
    }
    this.setState({ savedArticles: newSavedArticles });
  };

  handleNextHover = () => {
    if (this.state.pageNumber === 2 && this.state.users.length === 0) {
      this.getUsersToFollow();
    }
  };

  handleNextButton = () => {
    if (
      this.state.pageNumber === 2 &&
      this.state.users.length === 0 &&
      this.state.articles.length === 0
    ) {
      this.getUsersToFollow();
    }
    if (this.state.pageNumber < 5) {
      this.setState({ pageNumber: this.state.pageNumber + 1 });
      if (this.state.pageNumber === 4 && this.state.checkedUsers.length > 0) {
        this.handleBulkFollowUsers(this.state.checkedUsers);
      } else if (this.state.pageNumber === 5) {
        this.handleUserProfileSave(this.state.profileInfo);
      }
    } else if (this.state.pageNumber === 5) {
      this.closeOnboarding();
    }
    const sloan = document.getElementById('sloan-mascot-onboarding-area');
  };

  handleBackButton = () => {
    if (this.state.pageNumber > 1) {
      this.setState({ pageNumber: this.state.pageNumber - 1 });
    }
  };

  closeOnboarding = async () => {
    document.getElementsByTagName('body')[0].classList.remove('modal-open');
    const formData = getFormDataAndAppend([
      { key: 'saw_onboarding', value: true },
    ]);

    if (window.ga && ga.create) {
      ga(
        'send',
        'event',
        'click',
        'close onboarding slide',
        this.state.pageNumber,
        null,
      );
    }
    const json = await apiUtil.sendOnboardingUpdate(formData);
    this.setState({ showOnboarding: json.outcome === 'onboarding opened' });
    // console.log('this is special')
    // console.log(this.state)
  };

  toggleOnboardingSlide = () => {
    if (this.state.pageNumber === 1) {
      return <OnboardingWelcome />;
    }
    if (this.state.pageNumber === 2) {
      return (
        <OnboardingFollowTags
          userData={this.state.userData}
          allTags={this.state.allTags}
          followedTags={this.state.followedTags}
          handleFollowTag={this.handleFollowTag}
        />
      );
    }
    if (this.state.pageNumber === 3) {
      return (
        <OnboardingFollowUsers
          users={this.state.users}
          checkedUsers={this.state.checkedUsers}
          handleCheckUser={this.handleCheckUser}
          handleCheckAllUsers={this.handleCheckAllUsers}
        />
      );
    }
    if (this.state.pageNumber === 4) {
      return <OnboardingProfile onChange={this.handleProfileChange} />;
    }
    if (this.state.pageNumber === 5) {
      return <OnboardingWelcomeThread />;
    }
  };

  renderBackButton = () => {
    if (this.state.pageNumber > 1) {
      return (
        <button className="button cta" onClick={this.handleBackButton}>
          {' '}
          BACK
          {' '}
        </button>
      );
    }
  };

  renderNextButton = () => (
    <button
      className="button cta"
      onClick={this.handleNextButton}
      onMouseOver={this.handleNextHover}
      onFocus={this.handleNextHover}
    >
      {this.state.pageNumber < 5 ? 'NEXT' : "LET'S GO"}
    </button>
  );

  renderPageIndicators = () => (
    <div className="pageindicators">
      <div
        className={
          this.state.pageNumber === 2
            ? 'pageindicator pageindicator--active'
            : 'pageindicator'
        }
      />
      <div
        className={
          this.state.pageNumber === 3
            ? 'pageindicator pageindicator--active'
            : 'pageindicator'
        }
      />
      <div
        className={
          this.state.pageNumber === 4
            ? 'pageindicator pageindicator--active'
            : 'pageindicator'
        }
      />
    </div>
  );

  renderSloanMessage = () => {
    const messages = {
      1: 'WELCOME!',
      2: 'FOLLOW TAGS',
      3: 'FOLLOW DEVS',
      4: 'CREATE YOUR PROFILE',
      5: 'GET INVOLVED',
    };
    return messages[this.state.pageNumber];
  };

  render() {
    const { showOnboarding } = this.state;
    if (showOnboarding) {
      return (
        <div className="global-modal" style="display:none">
          <div className="global-modal-bg">
            <button className="close-button" onClick={this.closeOnboarding}>
              <img src={cancelSvg} alt="cancel button" />
            </button>
          </div>
          <div className="global-modal-inner">
            <div className="modal-header">
              <div className="triangle-isosceles">
                {this.renderSloanMessage()}
              </div>
            </div>
            <div className="modal-body">
              <div
                id="sloan-mascot-onboarding-area"
                className="sloan-bar wiggle"
              >
                <img
                  src="https://res.cloudinary.com/practicaldev/image/fetch/s--iiubRINO--/c_imagga_scale,f_auto,fl_progressive,q_auto,w_300/https://practicaldev-herokuapp-com.freetls.fastly.net/assets/sloan.png"
                  className="sloan-img"
                />
              </div>
              <div className="body-message">{this.toggleOnboardingSlide()}</div>
            </div>
            <div className="modal-footer">
              <div className="modal-footer-left">{this.renderBackButton()}</div>
              <div className="modal-footer-center">
                {this.renderPageIndicators()}
              </div>
              <div className="modal-footer-right">
                {this.renderNextButton()}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
