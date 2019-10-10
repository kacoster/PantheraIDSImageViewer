#' PantheraIDSImageViewer
#'
#' Takes a path to a file and renders an image viewer
#'
#' @import htmlwidgets
#'
#' @export
PantheraIDSImageViewer <- function(filePath, width = NULL, height = NULL, elementId = NULL) {

  # forward options using x
  x = list(
    message = filePath
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'PantheraIDSImageViewer',
    x,
    width = width,
    height = height,
    package = 'PantheraIDSImageViewer',
    elementId = elementId
  )
}

#' Shiny bindings for PantheraIDSImageViewer
#'
#' Output and render functions for using PantheraIDSImageViewer within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a PantheraIDSImageViewer
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name PantheraIDSImageViewer-shiny
#'
#' @export
PantheraIDSImageViewerOutput <- function(outputId, width = '0%', height = '0px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'PantheraIDSImageViewer', width, height, package = 'PantheraIDSImageViewer')
}

#' @rdname PantheraIDSImageViewer-shiny
#' @export
renderPantheraIDSImageViewer <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, PantheraIDSImageViewerOutput, env, quoted = TRUE)
}
