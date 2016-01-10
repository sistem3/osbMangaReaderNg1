'use strict';

angular.module('sistem3.osb-manga-reader', ['osb-manga-reader-template'])
  .directive('osbMangaReader', ['$http', '$timeout', 'localStorageService', function ($http, $timeout, localStorageService) {
    return {
      templateUrl: 'app/osbMangaReader/osbMangaReader.html',
      restrict: 'EA',
      link: function ($scope, $element) {
        console.log('Adding Manga Reader');
        /*-- Init object --*/
        $scope.osbMangaReader = {};
        /*-- Init Settings --*/
        // App Settings
        $scope.osbMangaReader.settings = {
          'baseUrl': 'https://doodle-manga-scraper.p.mashape.com/',
          'defaultSite': 'mangareader.net',
          'apiKey': 'xiQSdA9ACbmshUxnm4ZBC8nn2umSp1LeqQfjsnnVeMWHHSIQy0',
          'mangaList': [],
          'mangaListAmount': 30,
          'mangaListLoading': true,
          'mangaSitePicksList': [],
          'mangaSitePicksPopulated': false,
          'mangaChapterLoading': true,
          'defaultView': 'manga-loading',
          'hideMenu': false,
          'osbFavourites': [
            {title: '20th Century Boys', id: '20th-century-boys'},
            {title: 'Akira', id: 'akira'},
            {title: 'Attack on Titan', id: 'shingeki-no-kyojin'},
            {title: 'Battle Angel Alita: Last Order', id: 'battle-angel-alita-last-order'},
            {title: 'Beelzebub', id: 'beelzebub'},
            {title: 'Bleach', id: 'bleach'},
            {title: 'Claymore', id: 'claymore'},
            {title: 'D-Gray Man', id: 'd-gray-man'},
            {title: 'Deadman Wonderland', id: 'deadman-wonderland'},
            {title: 'Fairy Tail', id: 'fairy-tail'},
            {title: 'Gantz', id: 'gantz'},
            {title: 'Naruto', id: 'naruto'},
            {title: 'One Piece', id: 'one-piece'},
            {title: 'Soul Eater', id: 'soul-eater'},
            {title: 'Vagabond', id: 'vagabond'}
          ]
        };
        // User settings
        $scope.osbMangaReader.settings.user = {
          'hasBookmarks': false,
          'bookmarks': [],
          'hasFavourites': false,
          'favourites': []
        };
        // Viewer Settings
        $scope.osbMangaReader.settings.mangaTitle = '';
        $scope.osbMangaReader.settings.viewer = {
          'pageNumber': 0,
          'totalPageNumber': 0,
          'chapterNumber': 0,
          'chapterName': 0,
          'showTools': false,
          'isReading': false,
          'bookmarkActive': false,
          'bookmarkActiveNumber': 0,
          'noMoreBookmarks': false,
          'noLessBookmarks':  false,
          'titleBookmarks': []
        };
        // Slider Params
        $scope.osbMangaReader.settings.viewer.sliderParams = {
          'slidesPerView': 1,
          'keyboardControl': true,
          'preloadImages': false,
          'lazyLoading': true
        };
        // Swiper Callback functions
        $scope.osbMangaReader.settings.viewer.sliderParams.onSlideChangeEnd = function(swiper) {
          $scope.osbMangaReader.settings.viewer.pageNumber = swiper.activeIndex + 1;
          $scope.$apply();
        };
        $scope.osbMangaReader.settings.viewer.sliderParams.onReachEnd = function() {
          console.log('Reaching the end brah');
          $scope.osbMangaReader.settings.viewer.chapterNumber = $scope.osbMangaReader.settings.viewer.chapterNumber + 1;
          $scope.osbMangaReader.functions.getMangaChapter($scope.osbMangaReader.settings.mangaTitle, $scope.osbMangaReader.settings.viewer.chapterNumber);
        };
        $scope.osbMangaReader.settings.viewer.sliderParams.onInit = function(swiper) {
          $scope.osbMangaReader.settings.viewer.totalPageNumber = swiper.slides.length - 1;
          $scope.$apply();
        };
        /*-- Main Functions --*/
        $scope.osbMangaReader.functions = {};
        $scope.osbMangaReader.functions.checkUniqueBookmark = function(bookmark, bookmarks) {
          var isUnique = true;
          angular.forEach(bookmarks, function(key) {
            if (key.name == bookmark.name && key.page == bookmark.page && key.chapter == bookmark.chapter) {
              isUnique = false;
            }
          });
          return isUnique;
        };
        // Set Bookmark
        $scope.osbMangaReader.functions.setBookmark = function() {
          //console.log('Save that page brah');
          var newBookMark = {
            title: $scope.osbMangaReader.settings.mangaTitle,
            chapter: $scope.osbMangaReader.settings.viewer.chapterNumber,
            page: $scope.osbMangaReader.settings.viewer.pageNumber - 1
          };
          if (!$scope.osbMangaReader.settings.user.hasBookmarks) {
            //console.log('Add intial bookmark brah');
            $scope.osbMangaReader.settings.user.hasBookmarks = true;
            $scope.osbMangaReader.settings.user.bookmarks.push(newBookMark);
            localStorageService.set('mangaReader.bookmark', $scope.osbMangaReader.settings.user.bookmarks);
            $scope.osbMangaReader.functions.checkBookmark(newBookMark.title);
          } else {
            //console.log('Is this unique brah');
            // Check if unique then add
            if ($scope.osbMangaReader.functions.checkUniqueBookmark(newBookMark, $scope.osbMangaReader.settings.user.bookmarks)) {
              //console.log('Add unique brah');
              $scope.osbMangaReader.settings.user.bookmarks.push(newBookMark);
              localStorageService.set('mangaReader.bookmark', $scope.osbMangaReader.settings.user.bookmarks);
              $scope.osbMangaReader.functions.checkBookmark(newBookMark.title);
            }
          }
        };
        // Get Bookmark
        $scope.osbMangaReader.functions.getBookmarks = function() {
          //console.log('Getting bookmarks brah');
          $scope.osbMangaReader.settings.user.bookmarks = localStorageService.get('mangaReader.bookmark');
          if (!$scope.osbMangaReader.settings.user.bookmarks) {
            $scope.osbMangaReader.settings.user.bookmarks = [];
            $scope.osbMangaReader.settings.user.hasBookmarks = false;
          } else {
            $scope.osbMangaReader.settings.user.hasBookmarks = true;
          }
        };
        // Check Bookmarks
        $scope.osbMangaReader.functions.checkBookmark = function(title) {
          //console.log('Check for bookmarks');
          if (!title === $scope.osbMangaReader.settings.mangaTitle) {
            $scope.osbMangaReader.settings.viewer.bookmarkActive = false;
          } else {
            angular.forEach($scope.osbMangaReader.settings.user.bookmarks, function(key, value) {
              if (key.title === title && $scope.osbMangaReader.settings.viewer.titleBookmarks.indexOf(key) == -1) {
                $scope.osbMangaReader.settings.viewer.titleBookmarks.push(key);
                $scope.osbMangaReader.settings.viewer.bookmarkActive = true;
              }
            });
            $scope.osbMangaReader.functions.getBookmarkStatus();
          }
        };
        // GoTo Bookmark
        $scope.osbMangaReader.functions.goToBookMark = function() {
          //console.log('Go to bookmark brah');
          // Check if there are Bookmarks coming up
          if ($scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber] === null ||
            $scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber] === '' ||
            $scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber] === undefined) {
            //console.log('Aint no more brah');
            return false;
          }
          $scope.osbMangaReader.functions.getBookmarkStatus();
          // Check if Bookmark is in Next Chapter
          if ($scope.osbMangaReader.settings.viewer.chapterNumber < $scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber].chapter) {
            console.log('Load next chapter');
            $scope.osbMangaReader.functions.getMangaChapter(
              $scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber].title,
              $scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber].chapter,
              $scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber].page
            );
            if (!$scope.osbMangaReader.settings.viewer.noMoreBookmarks) {
              $scope.osbMangaReader.settings.viewer.bookmarkActiveNumber = $scope.osbMangaReader.settings.viewer.bookmarkActiveNumber + 1;
            }
          }
          // If is the same Chapter goTo Slide
          if ($scope.osbMangaReader.settings.viewer.pageNumber - 1 < $scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber].page &&
            $scope.osbMangaReader.settings.viewer.chapterNumber === $scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber].chapter) {
            console.log('Load next page');
            // Get next Bookmark
            $scope.osbMangaReader.mangaView.slideTo($scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber].page);
            if (!$scope.osbMangaReader.settings.viewer.noMoreBookmarks) {
              $scope.osbMangaReader.settings.viewer.bookmarkActiveNumber = $scope.osbMangaReader.settings.viewer.bookmarkActiveNumber + 1;
            }
          }
        };
        // GoTo Prev Bookmark
        $scope.osbMangaReader.functions.goToPrevBookMark = function() {
          //console.log('Go to previous bookmark brah');
          // Check if Bookmark is in Next Chapter
          console.log($scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber - 1]);
          if ($scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber - 1] === null ||
            $scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber - 1] === '' ||
            $scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber - 1] === undefined) {
            //console.log('Aint no more brah');
            return false;
          }
          $scope.osbMangaReader.functions.getBookmarkStatus();
          if ($scope.osbMangaReader.settings.viewer.chapterNumber > $scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber - 1].chapter) {
            console.log('Load next chapter');
            $scope.osbMangaReader.functions.getMangaChapter(
              $scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber - 1].title,
              $scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber - 1].chapter,
              $scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber - 1].page
            );
            if (!$scope.osbMangaReader.settings.viewer.noLessBookmarks) {
              $scope.osbMangaReader.settings.viewer.bookmarkActiveNumber = $scope.osbMangaReader.settings.viewer.bookmarkActiveNumber - 1;
            }
          }
          // If is the same Chapter goTo Slide
          if ($scope.osbMangaReader.settings.viewer.pageNumber - 1 > $scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber - 1].page &&
            $scope.osbMangaReader.settings.viewer.chapterNumber === $scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber - 1].chapter) {
            console.log('Load next page');
            // Get next Bookmark
            $scope.osbMangaReader.mangaView.slideTo($scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber - 1].page);
            if (!$scope.osbMangaReader.settings.viewer.noLessBookmarks) {
              $scope.osbMangaReader.settings.viewer.bookmarkActiveNumber = $scope.osbMangaReader.settings.viewer.bookmarkActiveNumber - 1;
            }
          }
        };
        // Get Bookmark Status
        $scope.osbMangaReader.functions.getBookmarkStatus = function() {
          //console.log('Get Bookmark status brah');
          if ($scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber - 1] === null ||
            $scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber - 1] === '' ||
            $scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber - 1] === undefined ||
            $scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber - 1] === -1) {
            console.log('No less');
            $scope.osbMangaReader.settings.viewer.noLessBookmarks = true;
          } else {
            $scope.osbMangaReader.settings.viewer.noLessBookmarks = false;
          }

          if ($scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber + 1] === null ||
            $scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber + 1] === '' ||
            $scope.osbMangaReader.settings.viewer.titleBookmarks[$scope.osbMangaReader.settings.viewer.bookmarkActiveNumber + 1] === undefined) {
            console.log('No more');
            $scope.osbMangaReader.settings.viewer.noMoreBookmarks = true;
          } else {
            $scope.osbMangaReader.settings.viewer.noMoreBookmarks = false;
          }
        };
        // Set Favourite
        $scope.osbMangaReader.functions.setFavourite = function(title) {
          if (!$scope.osbMangaReader.settings.user.hasFavourites) {
            //console.log('Add intial bookmark brah');
            $scope.osbMangaReader.settings.user.hasFavourites = true;
            $scope.osbMangaReader.settings.user.favourites.push(title);
            localStorageService.set('mangaReader.favourites', $scope.osbMangaReader.settings.user.favourites);
            //$scope.osbMangaReader.functions.checkBookmark(newBookMark.title);
          } else {
            //console.log('Is this unique brah');
            // Check if unique then add
            if ($scope.osbMangaReader.settings.user.favourites.indexOf(title) == -1) {
              //console.log('Add unique brah');
              $scope.osbMangaReader.settings.user.favourites.push(title);
              localStorageService.set('mangaReader.favourites', $scope.osbMangaReader.settings.user.favourites);
              //$scope.osbMangaReader.functions.checkBookmark(newBookMark.title);
            }
          }
        };
        // Get Favourites
        $scope.osbMangaReader.functions.getFavourites = function() {
          $scope.osbMangaReader.settings.user.favourites = localStorageService.get('mangaReader.favourites');
          if (!$scope.osbMangaReader.settings.user.favourites) {
            $scope.osbMangaReader.settings.user.favourites = [];
            $scope.osbMangaReader.settings.user.favourites = false;
          } else {
            $scope.osbMangaReader.settings.user.favourites = true;
          }
        };
        // Check if favourite
        $scope.osbMangaReader.functions.checkForFavourite = function(title) {
          console.log('Check if ya got some favourites brah');
        };
        // Get Main Manga List
        $scope.osbMangaReader.functions.getMangaList = function() {
          //console.log('Getting Manga List');
          $scope.osbMangaReader.settings.defaultView = 'manga-loading';
          $scope.osbMangaReader.settings.viewer.isReading = false;
          $http.get(
            $scope.osbMangaReader.settings.baseUrl + $scope.osbMangaReader.settings.defaultSite,
            {
              headers:{'X-Mashape-Authorization': $scope.osbMangaReader.settings.apiKey},
              params: {'cover':'1','info':'1'}
            }
          ).success(function (data) {
              //console.log(data);
              $scope.osbMangaReader.settings.defaultView = 'manga-list';
              $scope.osbMangaReader.settings.mangaListLoading = false;
              $scope.osbMangaReader.settings.mangaList = data;
          });
        };
        // Show more Manga List
        $scope.osbMangaReader.functions.showMoreManga = function() {
          //console.log('Show me more manga brah');
          $scope.osbMangaReader.settings.mangaListAmount = $scope.osbMangaReader.settings.mangaListAmount + 30;
        };
        // Get Site Favourites Titles
        $scope.osbMangaReader.functions.getSiteFavourites = function() {
          $scope.osbMangaReader.settings.mangaSitePicksPopulated = true;
          angular.forEach($scope.osbMangaReader.settings.osbFavourites, function(key) {
            $http.get(
              $scope.osbMangaReader.settings.baseUrl + $scope.osbMangaReader.settings.defaultSite + '/manga/' + key.id,
              {
                headers:{'X-Mashape-Authorization': $scope.osbMangaReader.settings.apiKey}
              }
            ).success(function (data) {
                data.mangaId = key.id;
                $scope.osbMangaReader.settings.mangaSitePicksList.push(data);
                $scope.osbMangaReader.settings.defaultView = 'manga-site-picks';
              });
          });
        };
        // Get Site Favourites List
        $scope.osbMangaReader.functions.getSiteMangaList = function() {
          //console.log('Where my Manga at brah');
          $scope.osbMangaReader.settings.defaultView = 'manga-loading';
          $scope.osbMangaReader.settings.viewer.isReading = false;
          if (!$scope.osbMangaReader.settings.mangaSitePicksPopulated) {
            $scope.osbMangaReader.functions.getSiteFavourites();
          } else {
            $scope.osbMangaReader.settings.defaultView = 'manga-site-picks';
          }
        };
        // Get Manga Title
        $scope.osbMangaReader.functions.getMangaTitle = function(title) {
          //console.log('Get me some manga info brah');
          $scope.osbMangaReader.settings.defaultView = 'manga-loading';
          $scope.osbMangaReader.settings.viewer.isReading = false;
          $http.get(
            $scope.osbMangaReader.settings.baseUrl + $scope.osbMangaReader.settings.defaultSite + '/manga/' + title,
            {
              headers:{'X-Mashape-Authorization': $scope.osbMangaReader.settings.apiKey}
            }
          ).success(function (data) {
              //console.log(data);
              $scope.osbMangaReader.settings.mangaTitle = data;
              $scope.osbMangaReader.settings.defaultView = 'manga-title';
            });
        };
        // Init Slider
        $scope.osbMangaReader.functions.initSlider = function() {
          $timeout(function(){
            $scope.osbMangaReader.mangaView = new Swiper($element.find('.swiper-container'), $scope.osbMangaReader.settings.viewer.sliderParams);
          }, 250);
        };
        // Get Manga Chapter
        $scope.osbMangaReader.functions.getMangaChapter = function(title, chapter, page) {
          console.log('Show me some manga brah');
          $scope.osbMangaReader.settings.defaultView = 'manga-loading';
          // GoTo Page if needed
          if (page) {
            $scope.osbMangaReader.settings.viewer.sliderParams.initialSlide = page;
          } else {
            $scope.osbMangaReader.settings.viewer.sliderParams.initialSlide = 0;
          }
          // Check for bookmarks
          $scope.osbMangaReader.functions.checkBookmark(title);
          // Destroy Slider if not defined
          if ($scope.osbMangaReader.mangaView) {
            $scope.osbMangaReader.mangaView.destroy();
          }
          $scope.osbMangaReader.settings.mangaTitle = title;
          $scope.osbMangaReader.settings.viewer.pageNumber = 1;
          $scope.osbMangaReader.settings.viewer.chapterNumber = chapter;
          $scope.osbMangaReader.settings.viewer.isReading = true;
          $http.get(
            $scope.osbMangaReader.settings.baseUrl + $scope.osbMangaReader.settings.defaultSite + '/manga/' + title + '/' + chapter,
            {
              headers:{'X-Mashape-Authorization': $scope.osbMangaReader.settings.apiKey}
            }
          ).success(function (data) {
              //console.log(data);
              $scope.osbMangaReader.settings.mangaChapterLoading = false;
              $scope.osbMangaReader.settings.mangaChapter = data;
              $scope.osbMangaReader.settings.defaultView = 'manga-viewer';
              $scope.osbMangaReader.functions.initSlider();
            });
        };
        // Search Manga Titles
        $scope.osbMangaReader.functions.searchMangaTitles = function(title) {
          console.log('Find me some manga brah');
          $scope.osbMangaReader.settings.defaultView = 'manga-loading';
          $scope.osbMangaReader.settings.viewer.isReading = false;
          $http.get(
            $scope.osbMangaReader.settings.baseUrl + $scope.osbMangaReader.settings.defaultSite + '/search',
            {
              headers:{'X-Mashape-Authorization': $scope.osbMangaReader.settings.apiKey},
              params: {'cover':'1','info':'1', 'q': title}
            }
          ).success(function (data) {
              //console.log(data);
              $scope.osbMangaReader.settings.searchResults = data;
              $scope.osbMangaReader.settings.defaultView = 'manga-results';
            });
        };
        // Set isReading
        $scope.osbMangaReader.functions.setIsReading = function () {
          var isReading = {
            reading: $scope.osbMangaReader.settings.viewer.isReading,
            title: $scope.osbMangaReader.settings.mangaTitle,
            chapter: $scope.osbMangaReader.settings.viewer.chapterNumber,
            page: $scope.osbMangaReader.settings.viewer.pageNumber
          };
          localStorageService.set('mangaReader.reading', isReading);
        };
        // Init App
        $scope.osbMangaReader.functions.initMangaReader = function() {
          //console.log('Start it up brah');
          $scope.osbMangaReader.functions.getSiteMangaList();
          $scope.osbMangaReader.functions.getBookmarks();
        };
        $scope.osbMangaReader.functions.initMangaReader();
      }

    };
  }]);
