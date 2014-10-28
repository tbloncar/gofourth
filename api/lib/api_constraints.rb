class APIConstraints
  def initialize(version: , default: false)
    @version = version
    @default = default
  end

  def matches?(req)
    @default
  end
end
