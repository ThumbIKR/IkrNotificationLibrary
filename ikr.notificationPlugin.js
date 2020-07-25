(function ($) {
    // ****** Add ikr.notification.css ******
    $.fn.ikrNotificationSetup = function (options) {
        /*
          Declaration : $("#noti_Container").ikrNotificationSetup({
                    List: objCollectionList
          });
       */
        var defaultSettings = $.extend({
            BeforeSeenColor: "#2E467C",
            AfterSeenColor: "#ccc"
        }, options);
        $(".ikrNoti_Button").css({
            "background": defaultSettings.BeforeSeenColor
        });
        var parentId = $(this).attr("id");
        if ($.trim(parentId) != "" && parentId.length > 0) {
            $("#" + parentId).append("<div class='ikrNoti_Counter'></div>" +
                "<div class='ikrNoti_Button'></div>" +
                "<div class='ikrNotifications'>" +
                "<h3>Notifications (<span class='notiCounterOnHead'>0</span>)</h3>" +
                "<div class='ikrNotificationItems'>" +
                "</div>" +
                "<div class='ikrSeeAll'><a href='#'>See All</a></div>" +
                "</div>");

            $('#' + parentId + ' .ikrNoti_Counter')
                .css({ opacity: 0 })
                .text(0)
                .css({ top: '-10px' })
                .animate({ top: '-2px', opacity: 1 }, 500);

            $('#' + parentId + ' .ikrNoti_Button').click(function () {
                $('#' + parentId + ' .ikrNotifications').fadeToggle('fast', 'linear', function () {
                    if ($('#' + parentId + ' .ikrNotifications').is(':hidden')) {
                        $('#' + parentId + ' .ikrNoti_Button').css('background-color', defaultSettings.AfterSeenColor);
                    }
                    else $('#' + parentId + ' .ikrNoti_Button').css('background-color', defaultSettings.BeforeSeenColor);
                });
                $('#' + parentId + ' .ikrNoti_Counter').fadeOut('slow');
                return false;
            });
            $(document).click(function () {
                $('#' + parentId + ' .ikrNotifications').hide();
                if ($('#' + parentId + ' .ikrNoti_Counter').is(':hidden')) {
                    $('#' + parentId + ' .ikrNoti_Button').css('background-color', defaultSettings.AfterSeenColor);
                }
            });
            $('#' + parentId + ' .ikrNotifications').click(function () {
                return false;
            });

            $("#" + parentId).css({
                position: "relative"
            });
        }
    };
    $.fn.ikrNotificationCount = function (options) {
        /*
          Declaration : $("#myComboId").ikrNotificationCount({
                    NotificationList: [],
                    NotiFromPropName: "",
                    ListTitlePropName: "",
                    ListBodyPropName: "",
                    ControllerName: "Notifications",
                    ActionName: "AllNotifications"
          });
       */
        var defaultSettings = $.extend({
            NotificationList: [],
            NotiFromPropName: "",
            ListTitlePropName: "",
            ListBodyPropName: "",
            ControllerName: "Notifications",
            ActionName: "AllNotifications"
        }, options);
        var parentId = $(this).attr("id");
        if ($.trim(parentId) != "" && parentId.length > 0) {
            $("#" + parentId + " .ikrNotifications .ikrSeeAll").click(function () {
                window.open('../' + defaultSettings.ControllerName + '/' + defaultSettings.ActionName + '', '_blank');
            });

            var totalUnReadNoti = defaultSettings.NotificationList.filter(x => x.isRead == false).length;
            $('#' + parentId + ' .ikrNoti_Counter').text(totalUnReadNoti);
            $('#' + parentId + ' .notiCounterOnHead').text(totalUnReadNoti);
            if (defaultSettings.NotificationList.length > 0) {
                $.map(defaultSettings.NotificationList, function (item) {
                    var className = item.isRead ? "" : " ikrSingleNotiDivUnReadColor";
                    var sNotiFromPropName = $.trim(defaultSettings.NotiFromPropName) == "" ? "" : item[ikrLowerFirstLetter(defaultSettings.NotiFromPropName)];
                    $("#" + parentId + " .ikrNotificationItems").append("<div class='ikrSingleNotiDiv" + className + "' notiId=" + item.notiId + ">" +
                        "<h4 class='ikrNotiFromPropName'>" + sNotiFromPropName + "</h4>" +
                        "<h5 class='ikrNotificationTitle'>" + item[ikrLowerFirstLetter(defaultSettings.ListTitlePropName)] + "</h5>" +
                            "<div class='ikrNotificationBody'>" + item[ikrLowerFirstLetter(defaultSettings.ListBodyPropName)] + "</div>" +
                        "<div class='ikrNofiCreatedDate'>" + item.createdDateSt + "</div>" +
                        "</div>");
                    $("#" + parentId + " .ikrNotificationItems .ikrSingleNotiDiv[notiId=" + item.notiId + "]").click(function () {
                        if ($.trim(item.url) != "") {
                            window.location.href = item.url;
                        }
                    });
                });
            }
        }
    };
}(jQuery));

function ikrLowerFirstLetter(value) {
    return value.charAt(0).toLowerCase() + value.slice(1);
}

